const db = require('./connection');
const { User, Project, ToDo } = require('../models');

db.once('open', async () => {
  await ToDo.deleteMany();
  console.log('todos seeded');

  await Project.deleteMany();

  const projects = await Project.insertMany([
    {
      title: 'My Senior Thesis',
      description: 'My final project.',
      deadline: 'June 15th',
      toDos: [
        { description: 'Start 1st essay draft',
          status: 'notStarted'
        },
        { description: 'Research topic',
          status: 'InProgress'
        },
        { description: 'Interview 10 people',
          status: 'finished'
        },
      ],
    },
    {
      title: 'Prepare for party',
      description: 'Birthday party!!',
      deadline: 'July 9th',
      toDos: [
        { description: 'Pick up balloons',
          status: 'notStarted'
        },
        { description: 'Make cake',
          status: 'InProgress'
        },
        { description: 'Send invitations',
          status: 'finished'
        },
      ],
    },
    
  ]);

  console.log('projects seeded');

  await User.deleteMany();

  await User.create({
    name: 'Sophie',
    email: 'sophie@testmail.com',
    password: 'password',
    projects: [projects[0], projects[1]]
   
  });

  console.log('users seeded');

  process.exit();
});
