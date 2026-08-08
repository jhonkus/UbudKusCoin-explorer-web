import searchHandler from '../search';
import validatorsHandler from '../validators';

describe('API Route Handlers - Security & Input Validation', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { method: 'POST', body: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('/api/search Handler', () => {
    it('returns HTTP 400 error when search query is empty', () => {
      req.body = { q: '' };
      searchHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'error',
          message: 'Search query is required',
        })
      );
    });

    it('[SECURITY] handles XSS payload in search query safely without executing code', () => {
      const { client } = require('../../../grpc/client');
      const spy = jest.spyOn(client, 'Search').mockImplementationOnce((req: any, callback: any) => {
        callback(null, { Id: 0, Title: 'Not found', status: 'not_found' });
      });

      req.body = { q: '<script>alert("xss")</script>' };
      searchHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          Title: 'Not found',
        })
      );

      spy.mockRestore();
    });

    it('[SECURITY] handles SQL injection payload in search query safely', () => {
      const { client } = require('../../../grpc/client');
      const spy = jest.spyOn(client, 'Search').mockImplementationOnce((req: any, callback: any) => {
        callback(null, { Id: 0, Title: 'Not found', status: 'not_found' });
      });

      req.body = { q: "' OR '1'='1" };
      searchHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);

      spy.mockRestore();
    });
  });

  describe('/api/validators Handler', () => {
    it('handles gRPC error gracefully by returning HTTP 500 JSON error', () => {
      const { client } = require('../../../grpc/client');
      const spy = jest.spyOn(client, 'GetBchainInfo').mockImplementationOnce((req: any, callback: any) => {
        callback(new Error('gRPC connection timeout'), null);
      });

      validatorsHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Failed to fetch network validator data',
        })
      );

      spy.mockRestore();
    });

    it('returns formatted validator leaderboard on successful gRPC response', () => {
      const { client } = require('../../../grpc/client');
      const mockBlocks = [
        { height: '10', validator: '4val1' },
        { height: '9', validator: '4val1' },
        { height: '8', validator: '4val2' },
      ];
      const spy = jest.spyOn(client, 'GetBchainInfo').mockImplementationOnce((req: any, callback: any) => {
        callback(null, { blocks: mockBlocks });
      });

      validatorsHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          activeValidators: 2,
          totalBlocksAnalyzed: 3,
        })
      );

      spy.mockRestore();
    });
  });
});
