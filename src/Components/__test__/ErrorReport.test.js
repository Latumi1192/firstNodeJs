import React from 'react'
import ReactDOM from "react-dom"
import ErrorReport from '../ErrorReport'
import renderer from 'react-test-renderer';


it("Renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<ErrorReport/>,div)
})

it("Match Snapshot", () => {
    const component = renderer.create(
      <ErrorReport/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})