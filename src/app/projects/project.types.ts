export interface IProject {
  id: number;
  name: string;
  owner: {
    login: string;
  };
  description: string;
  html_url: string;
}
