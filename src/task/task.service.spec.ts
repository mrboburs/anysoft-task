import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { CreateTaskDto, StatusEnum, UpdateTaskDto } from './dto/task.dto';
import { KnexModule } from 'nestjs-knex';
import { TaskController } from './task.controller';
import { Any } from 'typeorm';



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
                        getSoftDeletedList: jest.fn(),
                        findById: jest.fn(),
                      
                     }
                },
             
            ],
        }).compile();

        service = module.get<TaskService>(TaskService);
        
    });
//   describe("delete",()=>{
//         it('should delete the intended row by input id', async () => {
//             const expectedEntity = { id: 1 };
           
//             // Mock service behavior
//             (service.hardDelete as jest.Mock).mockResolvedValue(expectedEntity);
            
        
//             const result = await service.hardDelete(1);
        
//             expect(service.hardDelete).toHaveBeenCalledWith(1);
//             expect(result).toEqual(expectedEntity);
//           });
//      })

//     describe("update",()=>{
//         it('should update the input value by id', async () => {
//             const expectedEntity = { id: 1, title: 'updated Entity' }
//             let TaskUpdate: UpdateTaskDto = {
//                 order_id:2,
//                 title: 'lorem',
//                 description: 'lorem',
//                 status: StatusEnum.ToDo,
//                 estimate: "2022-03-02 12:34:56+00",
//             };
//             // Mock service behavior
//             (service.updateTask as jest.Mock).mockResolvedValue(expectedEntity);
            
        
//             const result = await service.updateTask(1,TaskUpdate);
        
//             expect(service.updateTask).toHaveBeenCalledWith(1,TaskUpdate);
//             expect(result).toEqual(expectedEntity);
//           });
//      })

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
 describe("getSoftDeletedList",()=>{
    it('should return soft deleted list', async () => {
        const expectedEntity : any[]=[ 
            { id: 1, title: 'title1'},
            { id: 2, title: 'title2'}
        ];
        // Mock service behavior
        (service.getSoftDeletedList as jest.Mock).mockResolvedValue(expectedEntity);
        const result = await service.getSoftDeletedList(1,3);
    
        expect(service.getSoftDeletedList).toHaveBeenCalledWith(1,3);
        expect(result).toEqual(expectedEntity);
      });
 })
  
    // describe("create", () => {
    //     it("should be create Task ", async () => {
    //         let TaskCreate: CreateTaskDto = {
    //             order_id:2,
    //             description: 'lorem',
    //             estimate: "2022-03-02 12:34:56+00" ,
    //             status: StatusEnum.ToDo,
    //             title: 'lorem',
    //         }
    //         let expectedEntity = {
    //             id:2          
    //         };
  
    //         (service.createTask as jest.Mock).mockResolvedValue(expectedEntity);
    //         const result = await service.createTask(TaskCreate);
    //         expect(service.createTask).toHaveBeenCalledWith(TaskCreate)
    //         expect(result).toEqual(expectedEntity);           
    //     }); 

      
    // })
});
