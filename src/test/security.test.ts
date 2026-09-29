import {describe,expect,it} from 'vitest';
import {safeInternalPath,isAdminPath} from '../security/runtime';
describe('security helpers',()=>{it('rejects external redirects',()=>{expect(safeInternalPath('https://evil.test','/admin')).toBe('/admin');expect(safeInternalPath('//evil.test','/admin')).toBe('/admin');expect(safeInternalPath('/admin?tab=users','/admin')).toBe('/admin?tab=users')});it('classifies admin paths',()=>{expect(isAdminPath('/admin')).toBe(true);expect(isAdminPath('/admin/users')).toBe(true);expect(isAdminPath('/about')).toBe(false)})});
