import React from 'react'
import { act } from 'react-dom/test-utils';
import { create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

describe("ProfileStatus component", () => {
    test("status from props should de in the state", () => {
        let component;
        act(() => {
            component = create(<ProfileStatusWithHooks status="it-kamasutra.com" />) 
        })
        // const component = create(<ProfileStatus status="it-kamasutra.com" />)
        // const instance = component.root
        const root = component.root;
        const span = root.findByType("span");
        // span.props.onDoubleClick()
        // const input = root.findByType("input");
        // console.log(instance, 'gjghjghjgh')
        expect(span.props.children[1]).toBe("it-kamasutra.com")
    });
});