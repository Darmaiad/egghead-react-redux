import { v4 } from 'uuid';

const fakeDatabase = {
    todos: [{
        id: v4(),
        text: 'hey',
        completed: true,
    }, {
        id: v4(),
        text: 'ho',
        completed: true,
    }, {
        id: v4(),
        text: 'let\'s go',
        completed: false,
    },
    ],
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
