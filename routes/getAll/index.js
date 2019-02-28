
const handlers = ({ User, Project, Task }) => ({

    get: (req, res) => {

        User.find({}, (err, userDb) => {
            
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Project.find({}, (err, projectDb) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                
                Task.find({}, (err, TaskDb) => {

                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }
                    
                    res.status(200).json({
                        userDb,
                        projectDb,
                        TaskDb
                    })
                });
            });
        });
    }
})

module.exports = handlers;