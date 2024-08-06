import { registerBlockExtension } from '@10up/block-components';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, RangeControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const blocks = ['create-block/example-blocksmg'];

const additionalAttributes = {
	mobilePadding: {
		type: 'string',
		default: 'small'
	},
	tabletPadding: {
		type: 'string',
		default: 'small'
	},
	desktopPadding: {
		type: 'string',
		default: 'large'
	},
}

const BlockEditor = (props) => {

	const { attributes, setAttributes } = props;
	const { mobilePadding, tabletPadding, desktopPadding } = attributes;

	return (
		<InspectorControls>
			<PanelBody>
				<h2>Padding Block</h2>

				<PanelRow>
					<SelectControl
						label="Mobile Padding"
						labelPosition="edge"
						value={mobilePadding}
						onChange={(value) => {
							setAttributes({ mobilePadding: value })
						}}
						options={[
							{ label: 'None', value: 'none' },
							{ label: 'Small', value: 'small' },
							{ label: 'Medium', value: 'medium' },
							{ label: 'Large', value: 'large' },
						]}
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label="Tablet Padding"
						labelPosition="edge"
						value={tabletPadding}
						onChange={(value) => {
							setAttributes({ tabletPadding: value })
						}}
						options={[
							{ label: 'None', value: 'none' },
							{ label: 'Small', value: 'small' },
							{ label: 'Medium', value: 'medium' },
							{ label: 'Large', value: 'large' },
						]}
					/>
				</PanelRow>

				<PanelRow>
					<SelectControl
						label="Desktop Padding"
						labelPosition="edge"
						value={desktopPadding}
						onChange={(value) => {
							setAttributes({ desktopPadding: value })
						}}
						options={[
							{ label: 'None', value: 'none' },
							{ label: 'Small', value: 'small' },
							{ label: 'Medium', value: 'medium' },
							{ label: 'Large', value: 'large' },
						]}
					/>
				</PanelRow>

			</PanelBody>
		</InspectorControls>
	)
}

const generateClassName = (attributes) => {
	let string = '';
	if (attributes.mobilePadding) {
		string += ` has-mobilePadding-${attributes.mobilePadding}`;
	}

	if (attributes.tabletPadding) {
		string += ` has-tabletPadding-${attributes.tabletPadding}`;
	}

	if (attributes.desktopPadding) {
		string += ` has-desktopPadding-${attributes.desktopPadding}`;
	}

	return string;
}

registerBlockExtension(blocks, {
	extensionName: 'padding-settings',
	attributes: additionalAttributes,
	classNameGenerator: generateClassName,
	Edit: BlockEditor
});
