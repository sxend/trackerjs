import * as fs from 'fs';
import * as path from 'path';

export function readFileSync(file: string): string {
    return fs.readFileSync(path.join(__dirname, file)).toString();
}
