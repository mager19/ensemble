<?php

/**
 * Generates the markup for the Mansory Block.
 *
 * @param  array $block_wrapper_attributes The attributes for the block wrapper.
 * @return void
 */

$block_wrapper_attributes = get_block_wrapper_attributes(
    [
    'class' => 'mansory-block',
    'style' => ''
    ]
); ?>

<div <?php echo $block_wrapper_attributes; // phpcs:ignore ?>>
	<?php
		if ($attributes['titleBlock']) { ?>
			<div class="titleBlock__container">
				<h2 class="titleBlock"><?php echo $attributes['titleBlock']; ?></h2>
			</div>
	<?php
		}
	?>

    <?php
    if (taxonomy_exists('department')) {
        $terms = get_terms(
            array(
            'taxonomy'   => 'department',
            'hide_empty' => true,
            )
        );
    }

    if (!empty($terms)) { ?>
        <select name="department" class="department">
            <option value="All">All</option>
        <?php
        foreach ($terms as $term) {
            echo '<option value="' . $term->slug . '">' . $term->name . '</option>';
        }?>
        </select>
        <?php
    }
    ?>

    <div class="loader__container"></div>
    <div class="staff__container grid">
        <div class="grid-sizer"></div>
        <?php
        $args = array('post_type' => 'staff', 'posts_per_page' => -1);
        $loop = new WP_Query($args);
        if ($loop->have_posts()) :
            while ($loop->have_posts()) :
                $loop->the_post(); ?>
				<?php include plugin_dir_path(__FILE__) . 'partials/member.php'; ?>
            <?php endwhile; ?>
        <!-- post navigation -->
        <?php else : ?>
        <!-- no posts found -->
        <?php endif; ?>
    </div>

</div>
