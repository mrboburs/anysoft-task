import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { CreateTaskDto, TaskEnum, UpdateTaskDto } from './dto/task.dto';
import { KnexModule } from 'nestjs-knex';
import { TaskController } from './task.controller';



describe('TaskService', () => {
    let service: TaskService;
    let controller: TaskController;
 

   

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                KnexModule.forRootAsync({
                    useFactory: () => ({
                        config: {
                            client: "pg",
                            useNullAsDefault: true,
                            connection: {
                                host: 'localhost',
                                user: 'postgres',
                                port: "5434",
                                password: '123',
                                database: 'nest',
                            },
                        },
                    }),
                }),
            ],
            providers: [
                {provide: TaskService,
                    useValue: {
                        create: jest.fn(),
                        findById: jest.fn(),
                        update:jest.fn(),
                        delete:jest.fn(),
                     }
                },
             
            ],
        }).compile();

        service = module.get<TaskService>(TaskService);
        
    });
  describe("delete",()=>{
        it('should delete the intended row by input id', async () => {
            const expectedEntity = { id: 1 };
           
            // Mock service behavior
            (service.delete as jest.Mock).mockResolvedValue(expectedEntity);
            
        
            const result = await service.delete(1);
        
            expect(service.delete).toHaveBeenCalledWith(1);
            expect(result).toEqual(expectedEntity);
          });
     })

    describe("update",()=>{
        it('should update the input value by id', async () => {
            const expectedEntity = { id: 1, title: 'updated Entity' }
            let TaskUpdate: UpdateTaskDto = {
                order_id:2,
                title: 'lorem',
                description: 'lorem',
                status: TaskEnum.ACTIVE,
                estimate: 1,
            };
            // Mock service behavior
            (service.update as jest.Mock).mockResolvedValue(expectedEntity);
            
        
            const result = await service.update(1,TaskUpdate);
        
            expect(service.update).toHaveBeenCalledWith(1,TaskUpdate);
            expect(result).toEqual(expectedEntity);
          });
     })

 describe("findById",()=>{
    it('should return the found entity by id', async () => {
        const expectedEntity = { id: 2, title: 'Test Entity' };
        // Mock service behavior
        (service.findById as jest.Mock).mockResolvedValue(expectedEntity);
        
    
        const result = await service.findById(1);
    
        expect(service.findById).toHaveBeenCalledWith(1);
        expect(result).toEqual(expectedEntity);
      });
 })
  
    describe("create", () => {
        it("should be create Task ", async () => {
            let TaskCreate: CreateTaskDto = {
                order_id:2,
                description: 'lorem',
                estimate: 1,
                status: TaskEnum.ACTIVE,
                title: 'lorem',
            }
            let expectedEntity = {
                id:2          
            };
  
            (service.create as jest.Mock).mockResolvedValue(expectedEntity);
            const result = await service.create(TaskCreate);
            expect(service.create).toHaveBeenCalledWith(TaskCreate)
            expect(result).toEqual(expectedEntity);           
        }); 

      
    })
});
