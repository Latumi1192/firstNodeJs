import React from 'react'
import ReactDOM from "react-dom"
import Game from '../Game'
import renderer from 'react-test-renderer';

it("Renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Game/>,div)
})

it("Match Snapshot", () => {
    const component = renderer.create(
      <Game/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})