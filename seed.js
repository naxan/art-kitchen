const db = require('./models');

const exampleUsers = [
    {
        username: 'Anna',
        password: '1234',
        email: 'anna@email.com',
        bio: 'I am a cool gal',
    }
];

/*
{
    username: 'Leighann',
        password: '5678',
            email: 'leighann@email.com',
                bio: 'I am also a cool gal. Go Chicago',
    },
{
    username: 'Mark',
        password: '5678',
            email: 'mark@email.com',
                bio: 'My name is Mark. Totally coolies',
    },
{
    username: 'coolDude420',
        password: '5678',
            email: 'dude@email.com',
                bio: 'Yoooo surfs up cool dude lol 420',
    },
    */

const examplePosts = [
    {
        title: 'This is a post',
        body: 'I am writing a post on social media',
        tags: ['aliens', 'giraffe', 'candy'],
        description: 'This is a post about frogs and mushrooms',
    },
    {
        title: 'Example 2',
        body: 'The frog sits on a shroom. The shroom does not have room. The shroom in the room goes kaboom, boom boom boom.',
        tags: ['balloons', 'frog', 'mushroom'],
        description: 'This is a post about frogs and mushrooms',
    }
]

// delete users
db.User.deleteMany({}, (err, deletedUsers) => {
    if (err) {
        console.log(err);
        process.exit();
    }

    console.log(`Deleted ${deletedUsers.deletedCount} users`);

    // delete posts
    db.Post.deleteMany({}, (err, deletedPosts) => {
        if (err) {
            console.log(err);
            process.exit();
        }

        console.log(`Deleted ${deletedPosts.deletedCount} posts`);

        // create new Users
        db.User.create(exampleUsers, (err, createdUsers) => {
            if (err) {
                console.log(err);
                process.exit();
            }

            console.log(`Created ${createdUsers.length} users`);
            process.exit();
        })
    })
})