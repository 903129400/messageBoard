// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportComment from '../../../app/service/Comment';
import ExportTest from '../../../app/service/Test';

declare module 'egg' {
  interface IService {
    comment: ExportComment;
    test: ExportTest;
  }
}
