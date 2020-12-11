import { ColumnProps, ImageProps, UserProps } from '../store'
interface CheckCondition {
    format?: string[];
    size?: number;
}
type ErrorType = 'size' | 'format' | null

export function beforeUploadCheck(file: File, condition: CheckCondition) {
    const { format, size } = condition
    const isValideFormat = format ? format.includes(file.type) : true
    const isValideSize = size ? (file.size / 1024 / 1024 < size) : true
    let error: ErrorType = null
    if (!isValideFormat) {
        error = 'format'
    }
    if (!isValideSize) {
        error = 'size'
    }
    return {
        passed: isValideFormat && isValideSize,
        error
    }
}

export function generateFitUrl(data: ImageProps, width: number, height: number, format = ['m_pad']) {
    if (data && data.url) {
        const FormatStr = format.reduce((prev, current) => {
            return current + ',' + prev
        })
        data.fitUrl = data.url + `?x-oss-process-image/resize,${FormatStr}h_${height},w_${width}`
    }
}

export function addColumnAvatar(data: ColumnProps, width: number, height: number) {
   if(data.avatar) {
       generateFitUrl(data.avatar,width,width)
   } else {
       data.avatar = {
           fitUrl: require('../assets/column.jpg')
       }
   }
}