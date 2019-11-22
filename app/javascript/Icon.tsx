import React from 'react';

interface IconProps {
	name: string;
}

export function Icon(props: IconProps) {
	if (!/^[\w-]*$/.test(props.name)) {
		throw new Error(
			`Icon name contain only letters and dashes, invalid: "${props.name}"`
		);
	}
	const useTag = `<use xlink:href="/open-iconic.svg#${props.name}" />`;
	return (
		<svg
			className={`icon ${props.name}`}
			dangerouslySetInnerHTML={{ __html: useTag }}
		></svg>
	);
}
