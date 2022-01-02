import { useEffect, useState } from "react";

import { grpc } from "@improbable-eng/grpc-web";

import { BChainService } from "../services/bchain_pb_service";
import { PagingRequest } from '../services/bchain_pb'

const host = "http://54.254.238.133:5001";

// const host = "https://127.0.0.1:5001";
export const getBloks = (pagenum: number) => {

  const req = new PagingRequest();
  req.setPageNumber(pagenum);
  req.setResultPerPage(15);

  const [grpcRes, setGrpcRes] = useState(Object);

  useEffect(() => {
    grpc.unary(BChainService.GetBlocks, {
      request: req,
      host: host,
      onEnd: (res) => {
        const { message, status, statusMessage, headers, trailers } = res;
        // console.log(
        //   message,
        //   "\ntrailers=",
        //   trailers,
        //   "\nstatus=",
        //   status.toString(),
        //   statusMessage,
        //   "\nheaders=",
        //   headers
        // );
        if (message) setGrpcRes(message.toObject());
      },
    });
    return () => { };
  }, [pagenum]);
  return grpcRes;
};


export const GetTransactions = (pagenum: number) => {

  const req = new PagingRequest();
  req.setPageNumber(pagenum);
  req.setResultPerPage(15);


  const [grpcRes, setGrpcRes] = useState(Object);

  useEffect(() => {
    grpc.unary(BChainService.GetTransactions, {
      request: req,
      host: host,
      onEnd: (res) => {
        const { message, status, statusMessage, headers, trailers } = res;
        if (message) setGrpcRes(message.toObject());
      },
    });
    return () => { };
  }, [pagenum]);
  return grpcRes;
};