import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mascaraCpf'
})
export class MascaraCpfPipe implements PipeTransform {

  transform(value: string) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-$4');
  }

}
