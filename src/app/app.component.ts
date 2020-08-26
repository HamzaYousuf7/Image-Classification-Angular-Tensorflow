import { Component } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private model;
  public isLoading = false;
  public imagePreview;
  public isImgSet = false;
  public classifiedResultS;

  async loadModel() {
    this.isLoading = true;
    this.model = await mobilenet.load();
    this.isLoading = false;
    console.log('model is ready', this.model);
  }

  async classifyingImg(imageTagRef) {
    this.isLoading = true;
    console.log('are we getting the img tag', imageTagRef);
    const predictions = await this.model.classify(imageTagRef);
    console.log('Predictions: ');
    console.log(predictions);
    this.classifiedResultS = predictions;
    this.isLoading = false;
  }

  imagePickHandler(event) {
    // roll back
    this.classifiedResultS = null;
    this.isImgSet = false;
    const img = (event.target as HTMLInputElement).files[0];

    // console.log(img);
    if (!img) { return; }

    // image preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imagePreview = fileReader.result as string;
    };
    fileReader.readAsDataURL(img);
    this.isImgSet = true;
  }
}
