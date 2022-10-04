import React from 'react'
import ReactDOM from "react-dom"
import Square from '../Square'
import renderer from 'react-test-renderer';


it("Renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Square/>,div)
})

it("Match Snapshot", () => {
    const component = renderer.create(
      <Square/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
