// var assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

// import { DiffFoldingRangeProvider } from "../diff-improved-extension";



// import { equal } from "assert";
// import index from "./";

// describe("Typescript usage suite", () => {
//   it("should be able to execute a test", () => {
//     equal(true, true);
//   });
//   it("should return expected string", () => {
//     equal(index("incoming"), "incoming-static");
//   });
// });



var expect = require('expect.js');
import {} from 'mocha'
import { DiffFoldingRangeProvider } from "../../diff-improved-extension";
import * as vscode from 'vscode';
//var diff_improved_extension = require('../diff-improved-extension');

describe("DiffFoldingRangeProvider test suite", () => {
  it("should be able to be instantiated", () => {
    expect(new DiffFoldingRangeProvider()).not.to.be(undefined);
    // expect(1).to.be(2);
  });
  it("should create folding region for 1 file", () => {
    new vscode.TextDo
    expect(new DiffFoldingRangeProvider()).not.to.be(undefined);
    // expect(1).to.be(2);
  });
});
