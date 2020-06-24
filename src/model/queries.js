const db = require("./ConnectToDb.js");

// const loginUser = (request, response) => {
//     const { userEmail, userPassword } = request.body;

//     db.pool.query(`SELECT * FROM "Users" WHERE email=${userEmail} AND password=${userPassword}`, (error, results) => {
//         if (error) {
//             //HANDLE ERROR CASES
//             console.log(error);    
//             try{
//                 throw error;
//             }
//             catch(error){
                
//             }
//         }
//         else{
//             response.status(200).send(`Login successful`);

//             //CREATE AUTHENTICATION COOKIE
//             response.cookie("myCookie", "HEY THERE");
//         }
//     })
// }

const getAllUsers = (request, response) => {
    db.pool.query('SELECT * FROM "Users" ORDER BY "UserId" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const userId = parseInt(request.params.userId);

    db.pool.query(`SELECT * FROM "Users" WHERE "UserId" = ${userId}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAllProjects = (request, response) => {

    db.pool.query(`SELECT 
                "Users"."UserId", "Users"."FirstName", "Users"."LastName",        
                "ProjectRoster"."ProjectId", "Projects"."ProjectName",
                "Projects"."CreatedBy", "Projects"."Type", "Projects"."CreatedDate" 
            FROM "Projects" 
            LEFT JOIN "ProjectRoster"
            ON "Projects"."ProjectId" = "ProjectRoster"."ProjectId"
            LEFT JOIN "Users"
            ON "Users"."UserId" = "ProjectRoster"."UserId"
            ORDER BY "Projects"."ProjectName" ASC`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUsersProjects = (request, response) => {
    const userId = parseInt(request.params.userId);

    db.pool.query(`SELECT             
                "Users"."UserId", "Users"."FirstName", "Users"."LastName",        
                "ProjectRoster"."ProjectId", "Projects"."ProjectName",
                "Projects"."CreatedBy", "Projects"."Type", "Projects"."CreatedDate"
            FROM "Users" 
            LEFT JOIN "ProjectRoster"          
            ON "Users"."UserId" = "ProjectRoster"."UserId"          
            LEFT JOIN "Projects"         
            ON "Projects"."ProjectId" = "ProjectRoster"."ProjectId"         
            WHERE "Users"."UserId" = ${userId}
            ORDER BY "Projects"."ProjectName"`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTask = (request, response) => {
    const taskId = parseInt(request.params.taskId);

    db.pool.query(`SELECT * FROM "Tasks" WHERE "TaskId" = ${taskId}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUsersTasks = (request, response) => {
    const userId = parseInt(request.params.userId);
    const projectId = parseInt(request.params.projectId);

    /* 
        Set projectId = 0 to get all of the user's tasks for all projects.
    */

    if(projectId != 0)
    {
        db.pool.query(`SELECT             
                    "Tasks"."TaskId", "Tasks"."TaskDescription",             
                    "Tasks"."TaskDifficulty", "Tasks"."TaskName",
                    "Projects"."ProjectName"         
                FROM "Tasks"  
                LEFT JOIN "Projects"
                ON "Tasks"."ProjectId" = "Projects"."ProjectId"       
                WHERE "Tasks"."AssignedTo" = ${userId}         
                AND "Tasks"."ProjectId" = ${projectId}
                ORDER BY "Tasks"."ProjectId" ASC`, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
    else
    {
        db.pool.query(`SELECT             
                    "Tasks"."TaskId", "Tasks"."TaskDescription",             
                    "Tasks"."TaskDifficulty", "Tasks"."TaskName",
                    "Projects"."ProjectName"          
                FROM "Tasks"         
                LEFT JOIN "Projects"
                ON "Tasks"."ProjectId" = "Projects"."ProjectId"    
                WHERE "Tasks"."AssignedTo" = ${userId}
                ORDER BY "Tasks"."ProjectId" ASC`, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
    
}

const getAllTasksForProject = (request, response) => {
    const projectId = parseInt(request.params.projectId);

    db.pool.query(`SELECT * FROM "Tasks" WHERE "Tasks"."ProjectId" = ${projectId}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { email, password, firstName, lastName, birthdate } = request.body;

    db.pool.query(`INSERT INTO "Users"(
            "Email", "Password", "FirstName", "LastName", "Birthdate")
            VALUES ('${email}', '${password}', '${firstName}', '${lastName}', '${birthdate}');`, (error, results) => {
        if (error) {
            //HANDLE ERROR CASES
            if(error.code == "23505" && error.constraint == "Email")
                response.status(501).send("An account with this email already exists.");
            else
                response.status(500).send("Internal server error.");

            try{
                throw error;
            }
            catch(error){
                
            }
        }
        else{
            response.status(200).send(`User created successfully`)
        }
    })
}

const createProject = (request, response) => {
    const { projectName, createdBy, createdDate, teamId } = request.body;

    db.pool.query(`INSERT INTO "Projects"(
        "ProjectName", "CreatedBy", "CreatedDate", "TeamId")
        VALUES ('${projectName}', '${createdBy}', TO_TIMESTAMP(${createdDate}/1000), '${teamId}');`, (error, results) => {
        if (error) {
            //HANDLE ERROR CASES
            if(error.code == "23505" && error.constraint == "ProjectName")
                response.status(501).send("An project with this name already exists.");
            else
                response.status(500).send("Internal server error.");

            console.log(error);    
            try{
                throw error;
            }
            catch(error){
                
            }
        }
        else{
            response.status(200).send(`Project created successfully`)
        }
    })
}

const createTask = (request, response) => {
    const { taskName, projectId, createdBy, assignedTo, taskDescription, taskDifficulty, status, createdDate } = request.body;

    db.pool.query(`INSERT INTO "Tasks"(
                "TaskName", "ProjectId", "CreatedBy", "AssignedTo", "TaskDescription", "TaskDifficulty", "Status", "CreatedDate")
                VALUES ('${taskName}', '${projectId}', '${createdBy}', '${assignedTo}', '${taskDescription}', '${taskDifficulty}', '${status}', TO_TIMESTAMP(${createdDate}/1000));`, (error, results) => {
        if (error) {
            //HANDLE ERROR CASES
            if(error.code == "23505" && error.constraint == "Tasks_TaskName_key")
                response.status(501).send("A task with this name already exists within this project.");
            else
                response.status(500).send("Internal server error.");

            console.log(error);    
            try{
                throw error;
            }
            catch(error){
                
            }
        }
        else{
            response.status(200).send(`Task created successfully`)
        }
    })

    //TEMPORARY COOKIE CREATION EXAMPLE
    response.cookie("myCookie", "HEY THERE");
}


module.exports = {
    getAllUsers,
    getUserById,
    getTask,
    getAllProjects,
    getUsersProjects,
    getUsersTasks,
    getAllTasksForProject,
    createUser,
    createProject,
    createTask
};