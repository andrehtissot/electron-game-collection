import { exportCSVFile } from './exportCSVFile/exportCSVFile'
import { exportTXTFile } from './exportTXTFile'

declare var window: {
    ExportFile: {
        asCSV: typeof exportCSVFile
        asTXT: typeof exportTXTFile
    }
}

export const registerGlobalExportFile = () => {
    window.ExportFile = {
        asCSV: exportCSVFile,
        asTXT: exportTXTFile,
    }
}
