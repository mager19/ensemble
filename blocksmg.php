<?php
/**
 * Plugin Name:       Mansory Block
 * Description:       A plugin of custom blocks
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.2
 * Author:            Codeable
 * Author URI:        https://twitter.com/mager19
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blocksmg
 *
 * @category Blocks
 * @package  CreateBlock
 * @author   Mager19 <mager19@gmail.com>
 * @license  GPL-2.0-or-later https://www.gnu.org/licenses/gpl-2.0.html
 * @link     https://twitter.com/mager19
 */

namespace Blocksmg;

if (! defined('ABSPATH') ) {
    die('Silence is golden.');
}
/**
 * Constructor Class
 *
 * @category Blocks
 * @package  CreateBlock
 * @author   Mager19 <mager19@gmail.com>
 * @license  GPL-2.0-or-later https://www.gnu.org/licenses/gpl-2.0.html
 * @link     https://twitter.com/mager19
 */

final class Blocksmg
{
    /**
     * Init function
     * */
    static function init()
    {

        add_action(
            'init', function () {
                add_filter(
                    'block_categories_all', function ($categories) {
                        array_unshift(
                            $categories, [
                            'slug' => 'blocksmg',
                            'title' => __('Blocksmg', 'blocksmg'),
                            ]
                        );
                        return $categories;
                    }
                );
                $blocks = glob(__DIR__ . '/build/blocks/*/block.json');
                foreach ($blocks as $block) {
                    register_block_type($block);
                }

                $asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';

                wp_enqueue_script('index-settings', plugin_dir_url(__FILE__) . '/build/index.js', $asset_file['dependencies'], $asset_file['version'], true);

                wp_localize_script(
                    'index-settings',
                    'admin_url',
                    array('ajax_url' => admin_url('admin-ajax.php'))
                );

                // Add AJAX action hooks here
                add_action('wp_ajax_filter_staff', array(__CLASS__, 'filter_staff'));
                add_action('wp_ajax_nopriv_filter_staff', array(__CLASS__, 'filter_staff'));
            }
        );
    }

    /**
     * filter_staff
     * */
    public static function filter_staff()
    {
        $value = $_POST['valueSelected'];

        if ($value === 'All') {
            $args = array(
                'post_type' => 'staff',
                'post_status' => 'publish',
                'posts_per_page' => -1,
            );
        } else {
            $args = array(
            'post_type' => 'staff',
            'post_status' => 'publish',
            'tax_query' => array(
            array(
            'taxonomy' => 'department',
            'field'    => 'slug',
            'terms'    => $value,
            ),
            ),
            );
        }

        $query = new \WP_Query($args);?>
        <div class="grid-sizer">
        <?php
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
				include plugin_dir_path(__FILE__) . 'build/blocks/mansoryBlock/partials/member.php';
            }
        } ?>
        </div>
        <?php
        wp_die();
    }
}

Blocksmg::init();
