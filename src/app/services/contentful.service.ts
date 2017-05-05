/**
 * Created by timordenewitz on 05.05.17.
 */
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
declare var contentful;

@Injectable()
export class ContentfulService {

  constructor() {
  }

  getArticles(contentType) {
      var client = contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: 'q4j5b0y01sj7',
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: '7b9d90f1e0264da1a9ce5271fa74f460d397f1fe130fd785042cbaa10d0d5102'
      });

      return client.getEntries({
        content_type: contentType
      });

      // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.

  }
}

