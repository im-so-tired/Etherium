import { gql } from "@apollo/client";
export const addUser = gql(`
	mutation addUser($email:String!,$phone:String!,$password:String!){
		addUser(email:$email,phone:$phone,password:$password){
			id
			email
			phone
			password
		}
	}
`);
export const setAuth = gql(`
	mutation setAuth($email:String!,$password:String!){
		setAuth(email:$email,password:$password){
			email
			password
		}
	}
`);
export const addTransfer = gql(`
	mutation addTransfer($from: String!, $to: String!, $sum: Int!, $message: String){
		addTransfer(from:$from,to:$to,sum:$sum,message:$message){
			from
			to
			sum
			message
		}
	}
`);
export const createBlock = gql(`
	mutation createBlock($sum:Int!){
		createBlock(sum:$sum){
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
