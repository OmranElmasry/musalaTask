/** @format */

import React, { FunctionComponent } from 'react'

const render = (props: any) => {
    if (typeof props.children === 'function') {
        return props.children()
    }

    return props.children || null
}

type Props = {
    condition: boolean
}

export const Then: FunctionComponent = (props) => {
    return render(props)
}

export const Else: FunctionComponent = (props) => {
    return render(props)
}

export const ElseIf: FunctionComponent<Props> = ({ condition, children }) => {
    return render({ condition, children })
}

export const When: FunctionComponent<Props> = ({ condition, children }) => {
    return condition && children ? render({ condition, children }) : null
}

export const If: FunctionComponent<Props> = ({ condition, children }: any) => {
    if (children == null) {
        return null
    }

    if (condition) {
        return [].concat(children).find((c: any) => c?.type === (<Then />)?.type) || null
    } else {
        return (
            [].concat(children).find((c: any) => c?.type === (<ElseIf condition />)?.type && !!c.props.condition) ||
            [].concat(children).find((c: any) => c?.type === (<Else />)?.type) ||
            null
        )
    }
}