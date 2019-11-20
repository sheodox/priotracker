import React from 'react';

interface IfProps {
    insertWhen?: boolean,
    visibleWhen?: boolean,
    children: any
}

export function If(props: IfProps) {
    if (props.hasOwnProperty('insertWhen')) {
        return <React.Fragment>
            {props.insertWhen ? props.children : null}
        </React.Fragment>
    }
    else if (props.hasOwnProperty('visibleWhen')) {
        return <div className={!props.visibleWhen && 'hidden'}>
            {props.children}
        </div>
    }
    else {
        throw new Error(`You must specify a condition for an If component`);
    }
}

