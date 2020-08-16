// setting and testing it up 
const { Worker,Scheduler,Queue} = require('node-resque') 


const jobs = {
    add:"10+30" 
}

const setBack = async(jobs) => {
    try{
         const connectionDetails = {
            redis:{
                host:'127.0.0.1',
                port:6379
            }
         }
        const worker =  await new Worker(
            {connection:connectionDetails},jobs
        )
        await worker.start()
        // const scheduler = new Scheduler({ connection: connectionDetails });
        // await scheduler.connect();
        // scheduler.start();
        worker.on("start", () => {
            console.log("worker started");
        });
        // worker.on("end", () => {
        //     console.log("worker ended");
        // });
        // worker.on("cleaning_worker", (worker, pid) => {
        //     console.log(`cleaning old worker ${worker}`);
        // });
        console.log('Connected')
    } catch(err){
        console.log(`Err:${err}`)
    }
    
}
module.exports = setBack