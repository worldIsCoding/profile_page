import { motion } from "framer-motion"




export const InfoSection =()=>{


    return (

        <div>
            <motion.div
            initial={{scale:0}}
            whileInView={{scale:1 }}
            viewport={{once:false}}
            
            className=" flex flex-col justify-center items-center"
            >
                <div>  this is  InfoSection</div>

                <div>desc</div>
            <div>
                images
            </div>

            </motion.div>
        
        
        </div>
    )
}