export const successHandler = ( response ) => response.data;

export const errorHandler = ( error ) => {
    console.log( "Something Went Wrong" );
    throw error;
};
