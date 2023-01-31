import React from "react";

function ProjectComponent() {
  return (
    <div class="container">
      <section class="card start">
        <p>Haven't Started</p>
        <ol>
          <li class="list-item">
            Final essay draft.
            <button class="list-button" title="Edit">
              /
            </button>
            <button class="list-button" title="Move to 'In Progress'"></button>
            <button class="list-button" title="Delete">
              X
            </button>
          </li>
          <li class="list-item">
            Organize project research and visuals.
            <button class="list-button" title="Edit">
              /
            </button>
            <button class="list-button" title="Move to 'In Progress'"></button>
            <button class="list-button" title="Delete">
              X
            </button>
          </li>
          <li class="list-item">
            {" "}
            Create powerpoint presentation.
            <button class="list-button" title="Edit">
              /
            </button>
            <button class="list-button" title="Move to 'In Progress'"></button>
            <button class="list-button" title="Delete">
              X
            </button>
          </li>
        </ol>
      </section>
      <section class="card progress">
        <p>In Progress</p>
        <ol>
          <li class="list-item">
            Interview 3 people.
            <button class="list-button" title="Edit">
              /
            </button>
            <button class="list-button" title="Move to 'Done'"></button>
            <button class="list-button" title="Delete">
              X
            </button>
          </li>
          <li class="list-item">
            Second essay draft
            <button class="list-button" title="Edit">
              /
            </button>
            <button class="list-button" title="Move to 'Done'"></button>
            <button class="list-button" title="Delete">
              X
            </button>
            .
          </li>
        </ol>
      </section>
      <section class="card done">
        <p>Done</p>
        <ol>
          <li class="list-item">
            Create project outline.
            <button class="list-button" title="Edit">
              /
            </button>
            <button class="list-button" title="Delete">
              X
            </button>
          </li>
          <li class="list-item">
            Essay rough draft.
            <button class="list-button" title="Edit">
              /
            </button>
            <button class="list-button" title="Delete">
              X
            </button>
          </li>
          <li class="list-item">
            Gather research materials.
            <button class="list-button" title="Edit">
              /
            </button>
            <button class="list-button" title="Delete">
              X
            </button>
          </li>
        </ol>
      </section>
    </div>
  );
}

export default ProjectComponent;
