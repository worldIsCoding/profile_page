
import {RankItem} from "./index"

export const RankView = ({rankList}:{rankList:RankItem[]}) => {

    return(
        <div className=" p-10 bg-secondary-300  border border-secondary-500">

{rankList.map((rank, index) => {
            return (
              <div key={index} className=" flex flex-row justify-between gap-4">
                <div>No.{index+1}</div>
                <div>{rank.name}</div>
                <div>{rank.time.toFixed(2)}</div>
              </div>
            );
          })}

        </div>
    )
}