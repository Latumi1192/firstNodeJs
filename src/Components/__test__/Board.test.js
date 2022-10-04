import React from 'react'
import ReactDOM from "react-dom"
import Board from '../Board'
import renderer from 'react-test-renderer';


const array = {square: Array(9).fill(null)}

it("Renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Board squares ={array}/>,div)
})

it("Match Snapshot", () => {
    const component = renderer.create(
        <Board squares ={array}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})