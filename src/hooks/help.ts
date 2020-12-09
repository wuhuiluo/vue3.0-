interface CheckCondition {
    format?: string[];
    size?: number;
}
type ErrorType = 'size' | 'format' | null

export function beforeUploadCheck(file: File, condition: CheckCondition) {
    const { format,size } = condition
    const isValideFormat = format? format.includes(file.type) : true
    const isValideSize = size ? (file.size / 1024 / 1024 < size) : true
    let error: ErrorType = null
    if(!isValideFormat) {
        error = 'format'
    }
    if(!isValideSize) {
        error = 'size'
    }
    return {
        passed: isValideFormat && isValideSize,
        error
    }
}