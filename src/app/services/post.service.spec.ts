import { TestBed, inject } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

describe('PostService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const testData = { text: `test data` };
  const apiUrl = 'https://conduit.productionready.io/api/articles';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));

  it('should do a api post', inject([PostService], (service: PostService) => {
    service
      .createPost({ body: `test body` })
      .subscribe(data => expect(data).toEqual(testData));

    const req = httpTestingController.expectOne(apiUrl);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      article: Object({
        title: undefined,
        description: 'test body',
        body: 'test body',
        tagList: undefined
      })
    });

    req.flush(testData);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });
});
