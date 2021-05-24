export const timeSetting = (dateData:Array<String>) =>{
    const curDate = new Date(Date.now())
    const localHours = curDate.getHours()
    const localMinute = curDate.getMinutes()
    const localSecond = curDate.getSeconds()
    const mergeDate = new Date(dateData[2]+'-'+dateData[1]+'-'+dateData[0]+'T'+'00:00:00'+'.000+00:00')
//    const mergeDate = new Date(dateData[2]+'-'+dateData[1]+'-'+dateData[0]+'T'+localHours+':'+localMinute+':'+localSecond+'.000+00:00')
    return mergeDate
}