export interface CustomErrorThis {
	message: string;
	code: string;
}

export const CustomError = function (
	this: CustomErrorThis,
	code: string,
	message: string
) {
	this.code = code;
	this.message = message;
};
// CustomError.prototype = new Error();
