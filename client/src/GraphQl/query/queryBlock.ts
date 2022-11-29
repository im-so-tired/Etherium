import { gql } from "@apollo/client";
export const getBlock = gql(`
	query{
		getBlocks{
			id
			nomer
			time
			hash
			countTrans
  		countCall
  		totalAmount
		}
	}
`);
export const getAllUsers = gql(`
	query{
		getAllUsers{
			id
			email
			phone
			password
		}
	}
`);
export const getAuth = gql(`
	query{
		getAuth{
			email
			password
		}
	}
`);
export const getTransferHistory = gql(`
	query{
		getTransferHistory{
			from
      to
      sum
      message
		}
	}
`);
