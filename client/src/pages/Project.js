import React from "react";
import AddNew from "./components/AddNew";

function ProjectComponent() {
  return (
    <div className="container">
      <section className="card start">
        <p>Haven't Started</p>
        <ol>
          <li className="list-item">
            Final essay draft.
            <button className="list-button" title="Edit">
              /
            </button>
            <button className="list-button" title="Move to 'In Progress'"></button>
            <button className="list-button" title="Delete">
              X
            </button>
          </li>
          <li className="list-item">
            Organize project research and visuals.
            <button className="list-button" title="Edit">
              /
            </button>
            <button className="list-button" title="Move to 'In Progress'"></button>
            <button className="list-button" title="Delete">
              X
            </button>
          </li>
          <li className="list-item">
            {" "}
            Create powerpoint presentation.
            <button className="list-button" title="Edit">
              /
            </button>
            <button className="list-button" title="Move to 'In Progress'"></button>
            <button className="list-button" title="Delete">
              X
            </button>
          </li>
        </ol>
      </section>
      <section className="card progress">
        <p>In Progress</p>
        <ol>
          <li className="list-item">
            Interview 3 people.
            <button className="list-button" title="Edit">
              /
            </button>
            <button className="list-button" title="Move to 'Done'"></button>
            <button className="list-button" title="Delete">
              X
            </button>
          </li>
          <li className="list-item">
            Second essay draft
            <button className="list-button" title="Edit">
              /
            </button>
            <button className="list-button" title="Move to 'Done'"></button>
            <button className="list-button" title="Delete">
              X
            </button>
            .
          </li>
        </ol>
      </section>
      <section className="card done">
        <p>Done</p>
        <ol>
          <li className="list-item">
            Create project outline.
            <button className="list-button" title="Edit">
              /
            </button>
            <button className="list-button" title="Delete">
              X
            </button>
          </li>
          <li className="list-item">
            Essay rough draft.
            <button className="list-button" title="Edit">
              /
            </button>
            <button className="list-button" title="Delete">
              X
            </button>
          </li>
          <li className="list-item">
            Gather research materials.
            <button className="list-button" title="Edit">
              /
            </button>
            <button className="list-button" title="Delete">
              X
            </button>
          </li>
        </ol>
      </section>

      <AddNew />
    </div>
  );
}

export default ProjectComponent;
