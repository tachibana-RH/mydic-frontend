import { TestBed, inject } from '@angular/core/testing';

import { RequestService } from './request.service';
import { CookieService } from 'ngx-cookie-service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('RequestService', () => {
  let service: RequestService;
  let cookieS: CookieService;
  const testData:object = {
    contentsInfo : {
      title: 'test-title',
      url: 'test-url',
      imageurl: 'test-imgUrl',
      genre: 'test-genre',
      tags: 'test-tag1 test-tag2',
      overview: 'test-overview'
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [ HttpClientTestingModule ],
      imports: [ HttpClientModule ],
      providers: [ RequestService, CookieService ]
    });
    service = TestBed.get(RequestService);
    cookieS = TestBed.get(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return guest token' , async (done) => {
    const response = await service.setAuth('guestlogin').toPromise();
    expect(response['token']).toBeDefined();
    done();
  });

  it('should not be return guest contents CRUD', async(done) => {
    if (cookieS.get('guestToken') !== '') {
      cookieS.delete('guestToken','/');
    }
    const create = service.setAppPost('guestRegistContents', testData).toPromise();
    await expectAsync(create).toBeRejected();

    const testEditData:object = {
      contentsId: 0,
      contentsInfo : {
        title: 'test-title-edit',
        url: 'test-url',
        imageurl: 'test-imgUrl',
        genre: 'test-genre',
        tags: 'test-tag1 test-tag2',
        overview: 'test-overview'
      }
    }
    const testDeleteData:object = {
      contentsId: 0
    }

    const read = service.setAppGet('guestGetContents').toPromise();
    await expectAsync(read).toBeRejected();

    const edit = service.setAppPut('guestEditContents', testEditData).toPromise();
    await expectAsync(edit).toBeRejected();
    
    const del = service.setAppDelete('guestDeleteContents', testDeleteData).toPromise();
    await expectAsync(del).toBeRejected();

    done();
  }, 10000);

  it('should be return guest contents CRUD' , async (done) => {
    if (cookieS.get('guestToken') === '') {
      const guesttoken = await service.setAuth('guestlogin').toPromise();
      cookieS.set('guestToken', guesttoken['token']);
    }
    const create = service.setAppPost('guestRegistContents', testData).toPromise();

    const responseCreate = await create;
    expect(responseCreate['title']).toBe('test-title');

    const testEditData:object = {
      contentsId: responseCreate['id'],
      contentsInfo : {
        title: 'test-title-edit',
        url: 'test-url',
        imageurl: 'test-imgUrl',
        genre: 'test-genre',
        tags: 'test-tag1 test-tag2',
        overview: 'test-overview'
      }
    }
    const testDeleteData:object = {
      contentsId: responseCreate['id']
    }

    const read = service.setAppGet('guestGetContents').toPromise();
    const responseRead = await read;
    expect(responseRead['contents'][0]['id']).toBe(responseCreate['id']);

    const edit = service.setAppPut('guestEditContents', testEditData).toPromise();
    const responseEdit = await edit;
    expect(responseEdit['id']).toBe(responseCreate['id']);
    expect(responseEdit['title']).toBe('test-title-edit');
    
    const del = service.setAppDelete('guestDeleteContents', testDeleteData).toPromise();
    const responseDelete = await del;
    expect(responseDelete['id']).toBe(responseCreate['id']);

    done();
  }, 10000);

  it('should not be return loginUser contents CRUD', async(done) => {
    const create = service.setAppPost('registContents', testData).toPromise();
    await expectAsync(create).toBeRejected();

    const testEditData:object = {
      contentsId: 0,
      contentsInfo : {
        title: 'test-title-edit',
        url: 'test-url',
        imageurl: 'test-imgUrl',
        genre: 'test-genre',
        tags: 'test-tag1 test-tag2',
        overview: 'test-overview'
      }
    }
    const testDeleteData:object = {
      contentsId: 0
    }

    const read = service.setAppGet('getContents').toPromise();
    await expectAsync(read).toBeRejected();

    const edit = service.setAppPut('editContents', testEditData).toPromise();
    await expectAsync(edit).toBeRejected();
    
    const del = service.setAppDelete('deleteContents', testDeleteData).toPromise();
    await expectAsync(del).toBeRejected();

    done();
  }, 10000);
});
