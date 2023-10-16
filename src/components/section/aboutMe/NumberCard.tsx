import CountUp from 'react-countup';


type NumberCardProps={
    number:number ,
    label:string
}
export const NumberCard=(props:NumberCardProps)=>{
    const {number,label}=props

    return(
        <div className=' shadow-lg rounded-lg border p-4'>
            <div className=' flex flex-col justify-end items-center'>
            <CountUp 
            className='text-3xl'
             start={100}
             delay={1}
             duration={2}
            end={number} />
            </div>
            <div className=''>
            {label}
            </div>
        </div>
    )
}