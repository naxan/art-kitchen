const db = require('./models');

const exampleUsers = [
    {
        username: 'Anna',
        password: '1234',
        email: 'anna@email.com',
        bio: 'I am a cool gal',
    },
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
];

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