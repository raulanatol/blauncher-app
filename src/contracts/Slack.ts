export interface Slack {
  focusMode(): Promise<any>;

  existFocusMode(): Promise<any>;

  changeStatus(newStatus): Promise<any>;

  clearStatus(): Promise<any>;

  doNotDisturb(minutes?: number): Promise<any>;

  offDoNotDisturb(): Promise<any>;

  changeToWorkspaceNumber(workspaceNumber: number): Promise<any>;
}
