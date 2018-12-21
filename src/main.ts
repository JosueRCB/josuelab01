import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));

/*
// Render the editor.
const editor = Editor.render(document.getElementById('editor'));

// For this demo we wait until the editor is ready before bootstrapping the Angular app!
editor.hook('OnReady', 'synchronous', (editorEvent: IEditorReadyEvent) => {
});

// When the host window resizes, we should notify the editor component about that.
// This is only necessary when you embed the editor in a custom element.
window.addEventListener('resize', () => editor.resize());
window.addEventListener('orientationchange', () => editor.resize());
*/
