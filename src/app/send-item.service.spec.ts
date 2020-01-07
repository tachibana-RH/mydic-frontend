import { TestBed } from '@angular/core/testing';

import { SendItemService } from './send-item.service';

interface itemProps {
  id: number;
  user_id: number;
  title: string;
  url: string;
  imageurl: string;
  genre: string;
  tags: string;
  overview: string;
  created_at: string;
  updated_at: string;
}

describe('SendItemService', () => {
  let service: SendItemService;
  let testdate:itemProps = {
    id: 0,
    user_id: 0,
    title: 'test',
    url: 'test',
    imageurl: 'test',
    genre: 'test',
    tags: 'test',
    overview: 'test',
    created_at: 'test',
    updated_at: 'test'
  };
  let testIndex = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.get(SendItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be geted variable data', () => {
    service.item = testdate;
    expect(service.item).toEqual(testdate);
  });

  it('should be geted variable index', () => {
    service.contentsIndex = testIndex;
    expect(service.contentsIndex).toEqual(testIndex);
  });
});
