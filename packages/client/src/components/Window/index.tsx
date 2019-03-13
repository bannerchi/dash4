import React from 'react';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
	window: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
	},
	windowAutoStretch: {
		height: '100%',
	},
	windowBright: {
		color: '#000',
		whiteSpace: 'pre',
		background: '#fff',
		boxShadow: 'rgba(0, 0, 0, 0.16) 0px 2px 4px',
		borderRadius: 6,
	},
	windowDark: {
		color: '#fff',
		whiteSpace: 'pre',
		background: '#000',
		border: '1px solid rgb(51, 51, 51)',
		boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 50px 0px',
		borderRadius: 5,
	},
};

interface IProps extends WithStyles<typeof styles> {
	header?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	dark?: boolean;
	autoStretch?: boolean;
}

export * from './Header';
export * from './Body';
export const Window = withStyles(styles)(
	({ className, classes, header, children, dark = false, autoStretch = true }: IProps) => {
		return (
			<div
				className={`${className || ''} ${classes.window} ${dark ? classes.windowDark : classes.windowBright} ${
					autoStretch ? classes.windowAutoStretch : ''
				}`}
			>
				{header && header}
				{children}
			</div>
		);
	}
);
