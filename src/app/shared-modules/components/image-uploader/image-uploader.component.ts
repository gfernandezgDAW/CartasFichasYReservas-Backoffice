import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  Output,
} from '@angular/core';
import { first } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { UtilsService } from '../../../common/utils.service';

import { UploadedFileResDto } from './dtos/uploadedFileRes.dto';

@Component({
  selector: 'app-image-uploader',
  templateUrl: 'image-uploader.component.html',
  styleUrls: ['image-uploader.component.scss'],
})
@Injectable()
export class ImageUploaderComponent {
  @Input() loadedImage: string | undefined;
  @Output() uploadRes = new EventEmitter<UploadedFileResDto>();
  constructor(private http: HttpClient, private utilsService: UtilsService) {}

  handleUpload = (item: any) => {
    const formData = new FormData();
    formData.append(item.name, item.file as any);
    return this.http
      .post(`${environment.apiUrl}file-uploader/upload`, formData)
      .pipe(first())
      .subscribe((res) => {
        const uploadedFileResDto = res as UploadedFileResDto;
        this.uploadRes.emit(uploadedFileResDto);
        this.loadedImage = uploadedFileResDto.updatedFilename;
        this.utilsService.displayToast(
          'La subida se completo con exito',
          'success'
        );
      });
  };

  getImageUploaderDescription() {
    return `Haz click o arrastra una imagen aqui para ${
      this.loadedImage ? 'reemplazar la actual' : 'subirla'
    }`;
  }

  getCompleteImageUrl() {
    return `${environment.apiUrl}/${this.loadedImage}`;
  }

  deleteImage(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.loadedImage = undefined;
    this.uploadRes.emit(undefined);
  }
}
