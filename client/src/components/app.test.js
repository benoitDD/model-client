import App from './app'
import renderer from 'react-test-renderer'
import React from 'react'

test('Test app', () => {
    const component = renderer.create(
        <App/>
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})