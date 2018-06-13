import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractInitial'
})
export class ExtractInitialPipe implements PipeTransform {

  transform(value: string): string {
    
    if (!value) return null

    return value[0].toUpperCase()
  }

}
