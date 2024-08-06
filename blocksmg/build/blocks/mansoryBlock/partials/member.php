<div class="grid-item">
                <a href="<?php echo get_the_permalink(); ?>">
					<?php if (has_post_thumbnail()) {
						the_post_thumbnail('full');
					} ?>

				<?php
				$id = get_the_ID();
				$linkedin_group = get_field('linkedinGroup', $id);
				?>
                    <div class="member__info">
						<div class="content">
							<a href="<?php echo get_the_permalink(); ?>">
								<h3 class="member__info__name"><?php the_title(); ?></h3>
								<?php if (get_field('position_title', $id)) { ?>
									<span>
										<?php the_field('position_title', $id); ?>
									</span>
								<?php
								} ?>
							</a>
							<div class="social__icons">
								<?php
								if ($linkedin_group && $linkedin_group['active'] && $linkedin_group['linkedin_profile']) {
									echo '<a href="' . esc_url($linkedin_group['linkedin_profile']) . '">';
									include plugin_dir_path(__FILE__) . '../assets/linkedin.svg';
									echo '</a>';
								}
								?>
							</div>
						</div>
					</div>
                </a>
            </div>
