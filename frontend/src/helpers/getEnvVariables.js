/**
 * Get the env variables 
 * @returns 
 */
export const getEnvVariables = () => {
  
  import.meta.env;
  
  return {
    ...import.meta.env
  }
}
