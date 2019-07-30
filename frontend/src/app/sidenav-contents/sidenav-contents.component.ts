import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

interface RouterLinkTreeNode {
  name: string;
  routerLink?: string[];
  children?: RouterLinkTreeNode[];
}

const LINKS: Array<RouterLinkTreeNode> = [
  {
    name: 'Emergency Contacts',
    children: [
      {
        name: 'Overview',
        routerLink: ['/contacts']
      },
      {
        name: 'Update',
        routerLink: ['/contacts/edit']
      }
    ]
  },
  {
    name: 'Damage Evaluation',
    children: [
      {
        name: 'Upload Pre-Disaster Photos',
        routerLink: ['/damage-eval/before-upload']
      },
      {
        name: 'Automated Damage Assessment',
        routerLink: ['/damage-eval/after-upload']
      }
    ]
  },
  {
    name: 'Risk Score',
    routerLink: ['/risk-breakdown']
  }
];

interface FlatTreeNode {
  expandable: boolean;
  name: string;
  level: number;
  routerLink: string[];
}

@Component({
  selector: 'app-sidenav-contents',
  templateUrl: './sidenav-contents.component.html',
  styleUrls: ['./sidenav-contents.component.scss']
})
export class SidenavContentsComponent implements OnInit {
  logoutErrorMessage: string;
  treeControl = new FlatTreeControl<FlatTreeNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  @Output()
  linkClicked = new EventEmitter<void>();

  private transformer(node: RouterLinkTreeNode, level: number) {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
      routerLink: node.routerLink
    };
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.dataSource.data = LINKS;
  }

  hasChild(_: number, node: FlatTreeNode) {
    return node.expandable;
  }

  onLinkClicked() {
    this.linkClicked.emit();
  }

  logout() {
    this.userService.logout().subscribe(resp => {
      this.linkClicked.emit();
      this.router.navigate(['/']);
    }, err => {
      this.logoutErrorMessage = 'Something went wrong when attempting to sign out.';
    });
  }
}
